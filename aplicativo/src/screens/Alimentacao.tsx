import { useState } from 'react';
import { Center, ScrollView, VStack,  Heading, useToast } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import { useAuth } from '@hooks/useAuth';

import { ScreenHeader } from '@components/ScreenHeader';
import { Button } from '@components/Button';
import { TextArea } from '@components/Textarea';

type FormDataProps = {
  refeicao: string;
}

const profileSchema = yup.object({
  refeicao: yup
    .string()
    .required('Escreva sua refeição'),
})

export function Alimentacao() {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({ 
    resolver: yupResolver(profileSchema) 
  });

  return (
    <VStack flex={1}>
      <ScreenHeader title='Alimentação' />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          <Heading color="gray.100" mb={4} fontSize="lg">
            Insira sua ultima refeição realizada
          </Heading>
          <Controller 
            control={control}
            name="refeicao"
            render={({ field: { value, onChange } }) => (
              <TextArea 
                bg="gray.600" 
                placeholder='Adicionar refeição'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
                numberOfLines={6}
                h={200}
              />
            )}
          />

          <Button 
            title="Adicionar refeição" 
            mt={4} 
            // onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isLoading}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}