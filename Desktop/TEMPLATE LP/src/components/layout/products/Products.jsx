import SEO from '../../components/common/SEO/SEO'
import Hero from '../../components/sections/Hero/Hero'
import Services from '../../components/sections/Services/Services'
import Features from '../../components/sections/Features/Features'
import CTA from '../../components/sections/CTA/CTA'
import { COMPANY_INFO } from '../../utils/constants'

function ServicesPage() {
  return (
    <>
      <SEO 
        title={`Serviços - ${COMPANY_INFO.name}`}
        description="Conheça nossos serviços de desenvolvimento web, apps mobile, design e marketing digital."
      />
      
      <Hero 
        title="Nossos Serviços"
        subtitle="Soluções completas e personalizadas para impulsionar seu negócio"
      />
      
      <Services />
      
      <Features />
      
      <CTA 
        title="Interessado em algum serviço?"
        subtitle="Entre em contato e receba um orçamento personalizado"
      />
    </>
  )
}

export default ServicesPage