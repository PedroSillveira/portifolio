import { Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './Partners.css'

function Partners({ partners = [] }) {
  // Exemplo de estrutura de partners:
  // [{ id: 1, name: 'Partner Name', logo: '/images/partners/logo.png' }]
  
  const defaultPartners = [
    { id: 1, name: 'Partner 1', logo: 'https://via.placeholder.com/150x80?text=Partner+1' },
    { id: 2, name: 'Partner 2', logo: 'https://via.placeholder.com/150x80?text=Partner+2' },
    { id: 3, name: 'Partner 3', logo: 'https://via.placeholder.com/150x80?text=Partner+3' },
    { id: 4, name: 'Partner 4', logo: 'https://via.placeholder.com/150x80?text=Partner+4' },
    { id: 5, name: 'Partner 5', logo: 'https://via.placeholder.com/150x80?text=Partner+5' },
  ]

  const partnersList = partners.length > 0 ? partners : defaultPartners

  return (
    <section className="partners-section">
      <Container>
        <div className="section-title" data-aos="fade-up">
          <h2>Nossos Parceiros</h2>
          <p className="section-subtitle">
            Empresas que confiam no nosso trabalho
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 }
          }}
          data-aos="fade-up"
        >
          {partnersList.map((partner) => (
            <SwiperSlide key={partner.id}>
              <div className="partner-logo">
                <img src={partner.logo} alt={partner.name} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  )
}

export default Partners