import { Container, Accordion } from 'react-bootstrap'
import { FAQ } from '../../../utils/constants'
import './FAQ.css'

function FAQSection() {
  return (
    <section className="faq-section">
      <Container>
        <div className="section-title" data-aos="fade-up">
          <h2>Perguntas Frequentes</h2>
          <p className="section-subtitle">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </div>

        <div className="faq-content" data-aos="fade-up">
          <Accordion>
            {FAQ.map((item) => (
              <Accordion.Item eventKey={item.id.toString()} key={item.id}>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body>{item.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  )
}

export default FAQSection