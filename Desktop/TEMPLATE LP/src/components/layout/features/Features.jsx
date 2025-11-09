import { Container, Row, Col } from 'react-bootstrap'
import Card from '../../common/card/Card'
import * as FaIcons from 'react-icons/fa'
import { FEATURES } from '../../../utils/constants'
import './Features.css'

function Features() {
  const getIcon = (iconName) => {
    const Icon = FaIcons[iconName]
    return Icon ? <Icon /> : null
  }

  return (
    <section className="features-section">
      <Container>
        <div className="section-title" data-aos="fade-up">
          <h2>Por que nos escolher?</h2>
          <p className="section-subtitle">
            Veja os diferenciais que nos tornam únicos no mercado
          </p>
        </div>

        <Row>
          {FEATURES.map((feature, index) => (
            <Col 
              lg={3} 
              md={6} 
              className="mb-4" 
              key={feature.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Card>
                <div className="feature-icon">
                  {getIcon(feature.icon)}
                </div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Features