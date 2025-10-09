import React from 'react'
import Slider from 'react-slick'
import { Text, Link, Card } from '@geist-ui/react'
import { Row, Col } from 'react-flexbox-grid'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const RelatedPostsCarousel = ({ posts }) => {
  const settings = {
    dots: true,
    infinite: posts.length > 1,
    speed: 500,
    slidesToShow: Math.min(posts.length, 2),
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <Slider {...settings}>
        {posts.map((edge) => (
          <div key={edge.node.frontmatter.path} style={{ padding: '0 10px' }}>
            <Link
              href={edge.node.frontmatter.path}
              pure
              style={{ width: '100%' }}
            >
              <Card shadow style={{ width: '100%', height: '100%' }}>
                <Row center="xs" middle="xs">
                  <Col xs={12}>
                    <img
                      src={edge.node.frontmatter.image}
                      alt={edge.node.frontmatter.title}
                      style={{
                        margin: 'auto',
                        height: '200px',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Col>
                  <Col xs={12} style={{ padding: '15px' }}>
                    <Row center="xs">
                      <Text h4 style={{ marginBottom: '10px' }}>
                        {edge.node.frontmatter.title}
                      </Text>
                    </Row>
                    <Row center="xs">
                      <Text small>{edge.node.frontmatter.excerpt}</Text>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default RelatedPostsCarousel
