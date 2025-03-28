import { useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveNavMenu from '../components/InteractiveNavMenu';
import AnimatedPetMascot from '../components/AnimatedPetMascot';
import ParallaxBackground from '../components/ParallaxBackground';

const PetQuiz = () => {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  // Quiz types
  const quizTypes = [
    {
      id: 'animal-personality',
      title: 'Which Animal Are You?',
      description: 'Answer these fun questions to discover which animal matches your personality!',
      icon: '🦊',
      color: 'purple'
    },
    {
      id: 'pet-trivia',
      title: 'Pet Trivia Challenge',
      description: 'Test your knowledge about pets and animals with this fun trivia game!',
      icon: '🧠',
      color: 'blue'
    }
  ];

  // Quiz questions
  const quizQuestions = {
    'animal-personality': [
      {
        question: 'How do you prefer to spend your free time?',
        options: [
          { text: 'Relaxing at home', animal: 'cat' },
          { text: 'Going for walks or runs', animal: 'dog' },
          { text: 'Socializing with friends', animal: 'parrot' },
          { text: 'Exploring new places', animal: 'fox' }
        ]
      },
      {
        question: 'How would your friends describe you?',
        options: [
          { text: 'Independent and mysterious', animal: 'cat' },
          { text: 'Loyal and energetic', animal: 'dog' },
          { text: 'Talkative and colorful', animal: 'parrot' },
          { text: 'Clever and adaptable', animal: 'fox' }
        ]
      },
      {
        question: 'What\'s your ideal vacation?',
        options: [
          { text: 'Cozy cabin retreat', animal: 'cat' },
          { text: 'Beach adventure', animal: 'dog' },
          { text: 'Tropical paradise', animal: 'parrot' },
          { text: 'Forest exploration', animal: 'fox' }
        ]
      },
      {
        question: 'What\'s your approach to challenges?',
        options: [
          { text: 'Carefully analyze before acting', animal: 'cat' },
          { text: 'Dive in with enthusiasm', animal: 'dog' },
          { text: 'Talk through solutions with others', animal: 'parrot' },
          { text: 'Find creative workarounds', animal: 'fox' }
        ]
      },
      {
        question: 'What\'s your preferred sleep schedule?',
        options: [
          { text: 'Night owl, active in the evening', animal: 'cat' },
          { text: 'Early bird, up at dawn', animal: 'dog' },
          { text: 'Regular schedule, consistent hours', animal: 'parrot' },
          { text: 'Adaptable, can adjust to any schedule', animal: 'fox' }
        ]
      }
    ],
    'pet-trivia': [
      {
        question: 'Which dog breed is the smallest in the world?',
        options: [
          { text: 'Chihuahua', correct: true },
          { text: 'Pomeranian', correct: false },
          { text: 'Yorkshire Terrier', correct: false },
          { text: 'Shih Tzu', correct: false }
        ]
      },
      {
        question: 'How many teeth does an adult cat have?',
        options: [
          { text: '20', correct: false },
          { text: '30', correct: true },
          { text: '40', correct: false },
          { text: '50', correct: false }
        ]
      },
      {
        question: 'Which of these animals is NOT a rodent?',
        options: [
          { text: 'Guinea Pig', correct: false },
          { text: 'Hamster', correct: false },
          { text: 'Rabbit', correct: true },
          { text: 'Rat', correct: false }
        ]
      },
      {
        question: 'What is a group of cats called?',
        options: [
          { text: 'Pack', correct: false },
          { text: 'Clowder', correct: true },
          { text: 'Herd', correct: false },
          { text: 'Flock', correct: false }
        ]
      },
      {
        question: 'Which bird species can fly backwards?',
        options: [
          { text: 'Eagle', correct: false },
          { text: 'Sparrow', correct: false },
          { text: 'Hummingbird', correct: true },
          { text: 'Penguin', correct: false }
        ]
      }
    ]
  };

  // Animal personality results
  const animalResults = {
    cat: {
      animal: 'Cat 🐱',
      description: 'You\'re independent, mysterious, and value your personal space. Like a cat, you\'re observant and prefer quality over quantity in relationships.',
      traits: ['Independent', 'Observant', 'Selective', 'Graceful']
    },
    dog: {
      animal: 'Dog 🐕',
      description: 'You\'re loyal, enthusiastic, and always ready for adventure! Like a dog, you value friendship and are always there when others need you.',
      traits: ['Loyal', 'Energetic', 'Friendly', 'Playful']
    },
    parrot: {
      animal: 'Parrot 🦜',
      description: 'You\'re colorful, expressive, and love to communicate! Like a parrot, you bring vibrancy to any social situation and are quick to learn.',
      traits: ['Expressive', 'Social', 'Intelligent', 'Colorful']
    },
    fox: {
      animal: 'Fox 🦊',
      description: 'You\'re clever, adaptable, and resourceful! Like a fox, you find creative solutions to problems and thrive in changing environments.',
      traits: ['Clever', 'Adaptable', 'Resourceful', 'Independent']
    }
  };

  // Handle starting a quiz
  const startQuiz = (quizId) => {
    setActiveQuiz(quizId);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  // Handle answering a question
  const answerQuestion = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < quizQuestions[activeQuiz].length - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, calculate result
      if (activeQuiz === 'animal-personality') {
        // Count animal frequencies
        const animalCounts = newAnswers.reduce((counts, animal) => {
          counts[animal] = (counts[animal] || 0) + 1;
          return counts;
        }, {});
        
        // Find the most frequent animal
        let maxCount = 0;
        let resultAnimal = '';
        
        for (const [animal, count] of Object.entries(animalCounts)) {
          if (count > maxCount) {
            maxCount = count;
            resultAnimal = animal;
          }
        }
        
        setResult(animalResults[resultAnimal]);
      } else if (activeQuiz === 'pet-trivia') {
        // Calculate score for trivia
        const correctCount = newAnswers.filter(answer => answer).length;
        setResult({
          score: correctCount,
          total: quizQuestions[activeQuiz].length
        });
      }
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background */}
      <ParallaxBackground colorScheme={activeQuiz === 'animal-personality' ? 'purple' : 'blue'} />
      
      {/* Navigation */}
      <div style={{ padding: '20px 40px' }}>
        <InteractiveNavMenu colorScheme={activeQuiz === 'animal-personality' ? 'purple' : 'blue'} />
      </div>
      
      {/* Pet Mascot */}
      <AnimatedPetMascot 
        petType={activeQuiz === 'animal-personality' ? 'cat' : 'dog'} 
        colorScheme={activeQuiz === 'animal-personality' ? 'purple' : 'blue'}
        position="bottom-right"
      />
      
      {/* Main Content */}
      <div style={{ 
        padding: '40px 20px', 
        maxWidth: '800px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Quiz Selection */}
        {!activeQuiz && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ 
                textAlign: 'center', 
                color: 'white',
                fontSize: '2.5rem',
                marginBottom: '30px',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              Pet Quiz Central
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ 
                textAlign: 'center', 
                color: 'white',
                fontSize: '1.2rem',
                marginBottom: '40px',
                maxWidth: '600px',
                margin: '0 auto 40px',
                textShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              Choose a fun pet-themed quiz to play!
            </motion.p>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '20px',
              alignItems: 'center'
            }}>
              {quizTypes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  onClick={() => startQuiz(quiz.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px',
                    padding: '25px',
                    width: '100%',
                    maxWidth: '500px',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: quiz.color === 'purple' ? '#6a1b9a' : '#1565c0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '2rem'
                  }}>
                    {quiz.icon}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', color: quiz.color === 'purple' ? '#4a148c' : '#0d47a1' }}>
                      {quiz.title}
                    </h3>
                    <p style={{ margin: 0, color: '#555' }}>
                      {quiz.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
        
        {/* Active Quiz - Questions */}
        {activeQuiz && !result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ 
                margin: 0,
                color: activeQuiz === 'animal-personality' ? '#4a148c' : '#0d47a1'
              }}>
                {activeQuiz === 'animal-personality' ? 'Which Animal Are You?' : 'Pet Trivia Challenge'}
              </h2>
              <div style={{
                background: activeQuiz === 'animal-personality' ? '#4a148c' : '#0d47a1',
                color: 'white',
                borderRadius: '20px',
                padding: '5px 15px',
                fontWeight: 'bold'
              }}>
                Question {currentQuestion + 1}/{quizQuestions[activeQuiz].length}
              </div>
            </div>
            
            <h3 style={{ marginTop: 0 }}>
              {quizQuestions[activeQuiz][currentQuestion].question}
            </h3>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '10px',
              marginTop: '20px'
            }}>
              {quizQuestions[activeQuiz][currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, backgroundColor: activeQuiz === 'animal-personality' ? '#f3e5f5' : '#e3f2fd' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => answerQuestion(
                    activeQuiz === 'animal-personality' 
                      ? option.animal 
                      : option.correct
                  )}
                  style={{
                    padding: '15px 20px',
                    borderRadius: '10px',
                    border: `2px solid ${activeQuiz === 'animal-personality' ? '#4a148c' : '#0d47a1'}`,
                    background: 'white',
                    textAlign: 'left',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Quiz Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              textAlign: 'center'
            }}
          >
            <h2 style={{ 
              color: activeQuiz === 'animal-personality' ? '#4a148c' : '#0d47a1',
              marginTop: 0
            }}>
              {activeQuiz === 'animal-personality' ? 'Your Result' : 'Quiz Complete!'}
            </h2>
            
            {activeQuiz === 'animal-personality' ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
                  style={{
                    fontSize: '5rem',
                    margin: '20px 0'
                  }}
                >
                  {result.animal.split(' ')[1]}
                </motion.div>
                
                <h3 style={{ color: '#4a148c' }}>{result.animal.split(' ')[0]}</h3>
                
                <p style={{ fontSize: '1.1rem', margin: '20px 0' }}>
                  {result.description}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: '10px',
                  justifyContent: 'center',
                  margin: '30px 0'
                }}>
                  {result.traits.map((trait, index) => (
                    <span
                      key={index}
                      style={{
                        background: '#f3e5f5',
                        color: '#4a148c',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontWeight: 'bold'
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: '#e3f2fd',
                    border: '10px solid #1565c0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#0d47a1',
                    margin: '20px auto'
                  }}
                >
                  {result.score}/{result.total}
                </motion.div>
                
                <h3 style={{ color: '#0d47a1' }}>
                  {result.score === result.total ? 'Perfect Score!' : 
                   result.score >= result.total * 0.7 ? 'Great Job!' :
                   result.score >= result.total * 0.5 ? 'Good Effort!' : 'Keep Learning!'}
                </h3>
                
                <p style={{ fontSize: '1.1rem', margin: '20px 0' }}>
                  {result.score === result.total ? 
                    'You\'re a pet trivia master! Your knowledge is impressive!' : 
                    `You got ${result.score} out of ${result.total} questions correct. ${
                      result.score >= result.total * 0.7 ? 'You really know your pet facts!' :
                      result.score >= result.total * 0.5 ? 'You have a good foundation of pet knowledge.' :
                      'There\'s always more to learn about our animal friends!'
                    }`
                  }
                </p>
              </>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              style={{
                padding: '15px 30px',
                borderRadius: '30px',
                border: 'none',
                background: activeQuiz === 'animal-personality' ? '#4a148c' : '#0d47a1',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              Try Another Quiz
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PetQuiz;