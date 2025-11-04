import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Grid, Row, Col } from 'react-flexbox-grid'
import {
  Button,
  Card,
  Input,
  Link,
  Loading,
  Select,
  Spacer,
  Tag,
  Text,
} from '@geist-ui/react'

import { Topbar } from '../../components'
import withStyle from '../../components/Layout'
import usePullToRefresh from '../../hooks/usePullToRefresh'
import paths from '../../utils/paths'

const PageSection = styled.section`
  min-height: 100vh;
  background: radial-gradient(circle at top, rgba(32, 32, 35, 0.9), #040404);
  color: #fff;
  padding-bottom: 80px;
`

const Hero = styled.div`
  padding: 80px 0 40px 0;
  text-align: center;
`

const FiltersPanel = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(8px);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
`

const TagsScroller = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
`

const CardsGrid = styled.div`
  position: relative;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  padding: 20px 0 0 0;
  transform: translateY(var(--pull-distance, 0px));
  transition: transform 0.2s ease;
`

const BlogCard = styled(Card)`
  && {
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 18px;
    overflow: hidden;
    background: rgba(10, 10, 12, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease,
      border-color 0.25s ease;
  }

  &&:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 38px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.16);
  }
`

const CoverImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${BlogCard}:hover & {
    transform: scale(1.03);
  }
`

const CardContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

const CardExcerpt = styled(Text)`
  && {
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.6;
    margin: 0;
  }
`

const TagsWrap = styled.div`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const PullIndicator = styled.div`
  position: relative;
  text-align: center;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  min-height: 28px;
  transition: opacity 0.2s ease;
`

const EmptyState = styled.div`
  padding: 80px 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  border: 1px dashed rgba(255, 255, 255, 0.12);
`

const formatDate = (value) => {
  if (!value) {
    return ''
  }

  try {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch (error) {
    return value
  }
}

const BlogsPage = ({ data, location, switchTheme }) => {
  const posts = useMemo(() => {
    return data.allMdx.nodes.map((node) => ({
      id: node.id,
      ...node.frontmatter,
      tags: node.frontmatter.tags || [],
    }))
  }, [data.allMdx.nodes])

  const distinctTags = useMemo(() => {
    return data.allMdx.distinct
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
  }, [data.allMdx.distinct])

  const params = useMemo(() => {
    if (typeof window === 'undefined') {
      return new URLSearchParams(location?.search ?? '')
    }

    return new URLSearchParams(window.location.search)
  }, [location?.search])

  const initialTag = params.get('tag') || 'all'
  const initialSearch = params.get('search') || ''
  const initialSort = params.get('sort') || 'newest'

  const [selectedTag, setSelectedTag] = useState(initialTag)
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [sortOrder, setSortOrder] = useState(
    initialSort === 'oldest' ? 'oldest' : 'newest'
  )
  const [visiblePosts, setVisiblePosts] = useState(posts)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshTick, setRefreshTick] = useState(0)

  const listRef = useRef(null)
  const pullDistance = usePullToRefresh(listRef, {
    onRefresh: () => {
      setIsRefreshing(true)
      setTimeout(() => {
        setRefreshTick((tick) => tick + 1)
        setIsRefreshing(false)
      }, 600)
    },
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = posts

      if (selectedTag !== 'all') {
        filtered = filtered.filter((post) =>
          post.tags.some(
            (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
          )
        )
      }

      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(
          (post) =>
            post.title.toLowerCase().includes(term) ||
            post.excerpt?.toLowerCase().includes(term)
        )
      }

      const sorted = [...filtered].sort((a, b) => {
        const first = new Date(a.date)
        const second = new Date(b.date)

        if (sortOrder === 'oldest') {
          return first - second
        }

        return second - first
      })

      setVisiblePosts(sorted)
      setIsLoading(false)
    }, 220)

    setIsLoading(true)

    return () => clearTimeout(timer)
  }, [posts, selectedTag, searchTerm, sortOrder, refreshTick])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const searchParams = new URLSearchParams()
    if (selectedTag && selectedTag !== 'all') {
      searchParams.set('tag', selectedTag)
    }

    if (searchTerm) {
      searchParams.set('search', searchTerm)
    }

    if (sortOrder === 'oldest') {
      searchParams.set('sort', sortOrder)
    }

    const query = searchParams.toString()
    const nextUrl = query ? `${paths.BLOG}?${query}` : paths.BLOG
    window.history.replaceState({}, '', nextUrl)
  }, [selectedTag, searchTerm, sortOrder])

  const resetFilters = useCallback(() => {
    setSelectedTag('all')
    setSearchTerm('')
    setSortOrder('newest')
  }, [])

  const siteMetadata = data.site?.siteMetadata ?? {}
  const canonical = siteMetadata.siteUrl
    ? `${siteMetadata.siteUrl.replace(/\/$/, '')}${paths.BLOG}`
    : undefined

  return (
    <PageSection ref={listRef}>
      <Grid fluid>
        <Helmet defer={false}>
          <title>{siteMetadata.title} · Blog Library</title>
          <meta
            name="description"
            content={
              siteMetadata.description ||
              'Browse engineering deep dives, product notes, and experiments.'
            }
          />
          {canonical ? <link rel="canonical" href={canonical} /> : null}
        </Helmet>
        <Topbar switchTheme={switchTheme} />
        <Row center="xs">
          <Col xs={11} md={10} lg={8}>
            <Hero>
              <Text h1 style={{ color: '#fff', marginBottom: '12px' }}>
                All blog posts
              </Text>
              <Text
                style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.1rem' }}
              >
                Filter long-form guides, experiments, and weekend projects by
                the topics you care about most.
              </Text>
              <Spacer h={2} />
              <Button
                auto
                type="secondary"
                ghost
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.scrollTo({
                      top: window.innerHeight,
                      behavior: 'smooth',
                    })
                  }
                }}
              >
                Jump to posts
              </Button>
            </Hero>
          </Col>
        </Row>

        <Row center="xs">
          <Col xs={11} md={10} lg={8}>
            <FiltersPanel>
              <Row around="xs" style={{ gap: '16px', flexWrap: 'wrap' }}>
                <Col xs={12} md={6}>
                  <Input
                    width="100%"
                    placeholder="Search by title or excerpt"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Select
                    value={sortOrder}
                    onChange={(value) => setSortOrder(value)}
                    placeholder="Sort"
                    width="100%"
                  >
                    <Select.Option value="newest">Newest first</Select.Option>
                    <Select.Option value="oldest">Oldest first</Select.Option>
                  </Select>
                </Col>
                <Col xs={12} md={3}>
                  <Button
                    width="100%"
                    auto
                    type="secondary"
                    ghost
                    disabled={
                      selectedTag === 'all' &&
                      !searchTerm &&
                      sortOrder === 'newest'
                    }
                    onClick={resetFilters}
                  >
                    Reset filters
                  </Button>
                </Col>
              </Row>

              {distinctTags.length ? (
                <TagsScroller>
                  <Tag
                    type={selectedTag === 'all' ? 'success' : 'lite'}
                    onClick={() => setSelectedTag('all')}
                    style={{ cursor: 'pointer' }}
                  >
                    #all-topics
                  </Tag>
                  {distinctTags.map((tag) => (
                    <Tag
                      key={tag}
                      type={selectedTag === tag ? 'success' : 'lite'}
                      onClick={() => setSelectedTag(tag)}
                      style={{ cursor: 'pointer' }}
                    >
                      #{tag}
                    </Tag>
                  ))}
                </TagsScroller>
              ) : null}
            </FiltersPanel>
          </Col>
        </Row>

        <Row center="xs">
          <Col xs={11} md={10} lg={8}>
            <Spacer h={2} />
            <PullIndicator
              style={{
                opacity: pullDistance > 10 || isRefreshing || isLoading ? 1 : 0,
              }}
            >
              {isRefreshing
                ? 'Refreshing posts…'
                : pullDistance > 70
                  ? 'Release to refresh'
                  : pullDistance > 0
                    ? 'Pull to refresh'
                    : isLoading
                      ? 'Loading posts…'
                      : ''}
            </PullIndicator>
            <CardsGrid style={{ '--pull-distance': `${pullDistance}px` }}>
              {isLoading ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                  <Loading type="success" size="large">
                    Updating feed…
                  </Loading>
                </div>
              ) : null}

              {!isLoading && visiblePosts.length === 0 ? (
                <EmptyState>
                  <Text h3 style={{ color: '#fff', marginBottom: '12px' }}>
                    No posts match your filters
                  </Text>
                  <Text style={{ color: 'rgba(255,255,255,0.72)' }}>
                    Try searching for a different keyword or clearing the tag
                    selection.
                  </Text>
                  <Spacer h={1.5} />
                  <Button type="secondary" auto ghost onClick={resetFilters}>
                    Clear filters
                  </Button>
                </EmptyState>
              ) : null}

              {visiblePosts.map((post) => (
                <Link
                  key={post.id}
                  href={post.path}
                  pure
                  style={{ textDecoration: 'none' }}
                >
                  <BlogCard shadow hoverable>
                    {post.image ? (
                      <CoverImage
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                      />
                    ) : null}
                    <CardContent>
                      <CardMeta>
                        <span>{formatDate(post.date)}</span>
                        {post.tags.length ? (
                          <span style={{ color: '#70e1f5' }}>
                            #{post.tags[0]}
                          </span>
                        ) : (
                          <span style={{ opacity: 0.6 }}>—</span>
                        )}
                      </CardMeta>
                      <Text h4 style={{ margin: 0, color: '#fff' }}>
                        {post.title}
                      </Text>
                      <CardExcerpt small>{post.excerpt}</CardExcerpt>
                      <TagsWrap>
                        {post.tags.map((tag) => (
                          <Tag key={`${post.id}-${tag}`} type="lite">
                            #{tag}
                          </Tag>
                        ))}
                      </TagsWrap>
                    </CardContent>
                  </BlogCard>
                </Link>
              ))}
            </CardsGrid>
          </Col>
        </Row>
      </Grid>
    </PageSection>
  )
}

export const query = graphql`
  query BlogsPage {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        frontmatter {
          title
          path
          excerpt
          tags
          image
          date
        }
      }
      distinct(field: { frontmatter: { tags: SELECT } })
    }
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`

export default withStyle(BlogsPage)
