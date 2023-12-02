import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Heading, HStack, Image, Text, VStack, Icon } from 'native-base';

import { Entypo } from '@expo/vector-icons';

import { api } from '@services/api';

import { ExerciseDTO } from '@dtos/ExerciseDTO';

type Props = TouchableOpacityProps & {
  data: ExerciseDTO;
};

export function ProductCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image 
          source={{ uri: `https://integralmedica.vteximg.com.br/arquivos/ids/165471/150g.png?v=638223508022800000` }}
          alt="Imagem do exercício"
          w={40}
          h={40}
          rounded="md"
          mr={4}
          resizeMode="center"
        />

        <VStack flex={1} mt={0} mb={0} display="flex" maxH={40} justifyContent='space-between' h="100%">
          <Heading fontSize="lg" color="white" fontFamily="heading">
            {/* {data.name} */}
            Creatina Hardcore
          </Heading>

          <Text fontSize="sm" color="gray.200"  numberOfLines={2} mb={5}>
            R$ 120 reais
          </Text>
        </VStack>

        <Icon 
          as={Entypo}
          name="chevron-thin-right"
          color="gray.200"
        />
      </HStack>
    </TouchableOpacity>
  );
}