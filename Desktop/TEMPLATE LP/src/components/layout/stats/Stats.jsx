import { Container, Row, Col } from 'react-bootstrap'
import { STATS } from '../../../utils/constants'
import './Stats.css'

function Stats() {
  return (
    <section className="stats-section">
      <Container>
        <Row>
          {STATS.map((stat, index) => (
            <Col 
              lg={3} 
              md={6} 
              className="mb-4 mb-lg-0" 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="stat-item">
                <h2 className="stat-number">
                  {stat.number}{stat.suffix}
                </h2>
                <p className="stat-label">{stat.label}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Stats