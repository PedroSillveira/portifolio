import { Container, Accordion } from 'react-bootstrap';
import React from 'react';
import '../index.css'; // Certifique-se de importar o CSS customizado
import '../styles/FAQ.css'; // Importa o CSS específico do FAQ

const faqData = [
    {
        question: "Qual o prazo de entrega para uma Landing Page ou MVP de SaaS?",
        answer: "Prazos variam conforme a complexidade. No entanto, operamos com sprints ágeis. Após a definição do escopo (que fazemos rapidamente), fornecemos um cronograma detalhado, geralmente entre 3 a 6 semanas para a primeira versão (MVP)."
    },
    {
        question: "Vocês trabalham apenas com a stack React, Node e PostgreSQL?",
        answer: "Nossa especialidade é essa stack moderna e escalável, ideal para performance e clean code (React, TypeScript, Node.js, PostgreSQL). Focar em um stack garante que entreguemos a mais alta qualidade, estabilidade e manutenibilidade para o seu projeto."
    },
    {
        question: "O orçamento é obrigatório para começar?",
        answer: "Sim. Nossos projetos são personalizados e focados em ROI. O 'Orçamento Personalizado' nos permite entender exatamente o seu objetivo (captação de leads, automação, vendas) para definir o escopo e o investimento necessário. É o primeiro passo para garantir o sucesso."
    },
    {
        question: "Minha equipe pode dar manutenção no código de vocês?",
        answer: "Absolutamente. Uma de nossas maiores premissas é o Clean Code. Seu código é entregue com documentação, tipagem em TypeScript e arquitetura modular, facilitando que qualquer desenvolvedor experiente na stack possa dar manutenção e evoluir o projeto."
    }
];

const FAQ: React.FC = () => {
    return (
        <section id="faq" className="py-5 bg-dark-secondary">
            <Container>
                <h2 className="text-center mb-5 animate-fade-in-up delay-1 fw-bold">
                    Dúvidas Frequentes (Sem enrolação)
                </h2>
                
                {/* ACORDEÃO DO BOOTSTRAP */}
                <Accordion defaultActiveKey="0" className="accordion-dark animate-fade-in-up delay-2">
                    {faqData.map((item, index) => (
                        <Accordion.Item key={index} eventKey={String(index)}>
                            <Accordion.Header>{item.question}</Accordion.Header>
                            <Accordion.Body>
                                {item.answer}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
                
                {/* REFORÇO FINAL */}
                <div className="text-center mt-5 text-light animate-fade-in-up delay-3">
                    <p className="lead">Não encontrou sua dúvida? Clique no botão abaixo para falar direto conosco.</p>
                </div>
            </Container>
        </section>
    );
};

export default FAQ;