import { useState } from 'react';
import { Container, TextInput, List, Button, Text, Flex, ScrollArea } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useHover } from '@mantine/hooks';
import writingsData from '../writings';
import { marked } from 'marked';

export function Writings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [writings, setWritings] = useState(writingsData);

  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    setWritings(
      writingsData.filter((writing) =>
        writing.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleViewWriting = (id) => {
    navigate(`/writings/${id}`); // Navigate to detailed writing page
  };

  return (
    <ScrollArea style={{ height: '100vh' }}>
      <Container size="md" style={{ padding: '2rem' }}>
        <Header />
        <Text style={{fontWeight: 600, paddingBottom: '.5rem'}}>
            Writings
        </Text>

        <TextInput
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(event) => handleSearch(event.target.value)}
            mb="md"
        />

        <List spacing="sm" size="sm" center>
        {writings.map((writing) => (
            <Text
                key={writing.id || writing.title}
                style={{ 
                    fontStyle: 'italic',
                    padding: '1vh', 
                    cursor: 'pointer'}}
                c={hoveredId === writing.id ? 'blue' : 'black'} 
                onMouseEnter={() => setHoveredId(writing.id)} 
                onMouseLeave={() => setHoveredId(null)} 
                onClick={() => navigate(`/writings/${writing.id || writing.title}`)}
            >
                {writing.title}
            </Text>
        ))}
        </List>
        <Footer />
    </Container>
    </ScrollArea>
);
}

export default Writings;
