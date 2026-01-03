import { useParams } from 'react-router-dom';
import { Container, Title, Text, Button, Group } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { marked } from 'marked';

import { Header } from '../components/Header';
import Footer from '../components/Footer';
import writingsData from '../writings';

export function Piece() {
  const { id } = useParams();
  const navigate = useNavigate();

  const writing = writingsData.find(
    (w) => (w.id && w.id.toString() === id) || w.title === id
  );

  if (!writing) {
    return (
      <Container>
        <Header />
        <Text align="center" style={{ fontWeight: 700, fontSize: '24px' }}>
          Writing Not Found
        </Text>
        <Button onClick={() => navigate('/writings')}>Back to Writings</Button>
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Group position="apart" align="center" mt="lg" mb="lg">
        <Button 
          variant="subtle" 
          onClick={() => navigate('/writings')}
          style={{ padding: 0 }}
        >
            <IconArrowLeft size={18} style={{  marginTop: '2px' ,marginRight: '5px'}}/>
            <Text style={{ marginRight: '5px'}}>Back</Text>
        </Button>
        <Title order={2} style={{ flexGrow: 1, textAlign: 'center'}}>
          {writing.title}
        </Title>
        <div style={{ width: '18px' }} />
      </Group>
      <div style={{ padding: '1rem 0' }}>
        <div dangerouslySetInnerHTML={{ __html: marked.parse(writing.content) }} />
      </div>
      <Footer />
    </Container>
  );
}

export default Piece;
