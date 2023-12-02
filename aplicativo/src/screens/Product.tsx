import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Heading, HStack, Icon, Image, Text, useToast, VStack } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { ExerciseDTO } from '@dtos/ExerciseDTO';

import { Button } from '@components/Button';
import { Loading } from '@components/Loading';


type RouteParamsProps = {
  exerciseId: string;
}

export function Product() {
  const [sendingRegister, setSendingRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const toast = useToast();

  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.navigate('shopping');
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);

      setExercise(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);
      
      await api.post('/history', { exercise_id: exerciseId });

      toast.show({
        title: 'Parabéns! Exercício registrado no seu histórico.',
        placement: 'top',
        bgColor: 'green.500'
      });

      navigation.navigate('history');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível registrar exercício.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  },[exerciseId])

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon 
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>

        <HStack justifyContent="space-between" mt={2} mb={2} alignItems="center"></HStack>
      </VStack>

      {isLoading ? <Loading /> : 
        <VStack p={8}>
          <Box rounded="lg" mb={3} overflow="hidden">
            <Image
              w="full"
              h={80}
              source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}` }}
              alt="Nome do exercício"
              resizeMode="cover"
              rounded="lg"
            />
          </Box>

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
              <HStack>
                <Heading color="gray.100" fontSize="lg" flexShrink={1} numberOfLines={2} fontFamily="heading" ml={-2}>
                  {exercise.name}
                </Heading>
              </HStack>

              <HStack>
                <Heading color="gray.100" fontSize="lg" flexShrink={1} numberOfLines={2} fontFamily="heading">
                $
                </Heading>
                
                <Text color="gray.200" ml="2">
                 120.50 reais
                </Text>
              </HStack>
            </HStack>

            <Text color="gray.200" ml="2">
              Descrição: Creatina creapure da marca integral medica
            </Text>
          </Box>
        </VStack>
      }
    </VStack>
  );
}