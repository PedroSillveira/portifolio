import { Container, Row, Col } from 'react-bootstrap'
import Card from '../../common/card/Card'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'
import { TEAM } from '../../../utils/constants'
import './Team.css'

function Team() {
  return (
    <section className="team-section">
      <Container>
        <div className="section-title" data-aos="fade-up">
          <h2>Nossa Equipe</h2>
          <p className="section-subtitle">
            Conheça os profissionais que fazem a diferença
          </p>
        </div>

        <Row>
          {TEAM.map((member, index) => (
            <Col 
              lg={4} 
              md={6} 
              className="mb-4" 
              key={member.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Card>
                <div className="team-member">
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-social">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Team