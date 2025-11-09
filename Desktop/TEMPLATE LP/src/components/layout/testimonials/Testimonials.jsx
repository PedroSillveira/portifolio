import { Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { FaStar } from 'react-icons/fa'
import { TESTIMONIALS } from '../../../utils/constants'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './Testimonials.css'

function Testimonials() {
  return (
    <section className="testimonials-section">
      <Container>
        <div className="section-title" data-aos="fade-up">
          <h2>O que dizem nossos clientes</h2>
          <p className="section-subtitle">
            Depoimentos de quem confia no nosso trabalho
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
          }}
          data-aos="fade-up"
        >
          {TESTIMONIALS.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <h5>{testimonial.name}</h5>
                  <p>{testimonial.role}</p>
                  <p className="company">{testimonial.company}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  )
}

export default Testimonials