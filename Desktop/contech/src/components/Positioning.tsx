import { Container, Row, Col, Button } from 'react-bootstrap';
import React from 'react';

const Positioning: React.FC = () => {
    // URL simulada para a página de pesquisa de orçamento
    const surveyUrl = "/orcamento-personalizado";

    return (
        <section id="diferencial" className="py-5 bg-dark-primary">
            <Container>
                
                {/* HEADLINE PERSUASIVO */}
                <h2 className="text-center mb-5 animate-fade-in-up delay-1 fw-bold">
                    Posicionamento que Converte: Por Que Nos Escolher?
                </h2>
                
                <Row className="align-items-center">
                    
                    {/* COLUNA ESQUERDA: FOCO EM TECNOLOGIA E CÓDIGO */}
                    <Col lg={6} className="mb-4 animate-slide-left">
                        <h3 className="text-cta-color mb-3">Clean Code é Garantia de Futuro.</h3>
                        <p className="lead">
                            Muitas empresas entregam soluções rápidas, mas com **"código sujo"** que se torna um pesadelo de manutenção. Nós construímos sistemas (SaaS, CRUDS) em **React, TypeScript e Node** com **arquitetura limpa**. Isso significa que seu investimento será **escalável, seguro e econômico** a longo prazo, adaptando-se a qualquer mudança de mercado.
                        </p>
                    </Col>
                    
                    {/* COLUNA DIREITA: FOCO EM RESULTADO E OTIMIZAÇÃO */}
                    <Col lg={6} className="mb-4 animate-slide-right">
                        <h3 className="text-cta-color mb-3">Otimização não é Luxo, é Sobrevivência.</h3>
                        <p className="lead">
                            Seu negócio precisa de **diferencial competitivo** para sobreviver. Nossas LPs e automações são projetadas para **reduzir o custo de aquisição de leads (CPL)** e aumentar a eficiência do seu atendimento. Não vendemos sites, vendemos **ferramentas de otimização** que impactam diretamente sua receita e sua marca. Seu sucesso é o nosso único KPI.
                        </p>
                    </Col>
                </Row>
                
                {/* CTA REFORÇO NO FINAL DA SEÇÃO */}
                <div className="text-center mt-5 animate-fade-in-up delay-3">
                    <h3 className="text-light mb-4">Pronto para construir o diferencial da sua marca?</h3>
                    <Button 
                        variant="custom" 
                        href={surveyUrl}
                        size="lg"
                        className="btn-cta-primary animate-pulse-on-hover" // Animação sutil para chamar a atenção
                    >
                        Quero Modernizar Minha Empresa Agora
                    </Button>
                </div>

            </Container>
        </section>
    );
};

export default Positioning;