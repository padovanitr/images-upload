import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

type ImageFormData = {
  title: string;
  description: string;
  url: string;
};

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: "Arquivo obrigatório",
      validate: {
        lessThan10MB: image => {
          const imageSize = image[0]?.size / 1000 / 1000;
          return imageSize < 10 || 'O arquivo deve ser menor que 10MB';
        },
        acceptedFormats: image => {
          const [match] = image[0]?.type?.match(/image\/png|jpeg|gif/);
          return !!match || 'Somente são aceitos arquivos PNG, JPEG e GIF';
        },
      },
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: "Título obrigatório",
      minLength : {
        value: 2,
        message: "Mínimo de 2 caracteres"
      },
      maxLength : {
        value: 20,
        message: "Máximo de 20 caracteres"
      }
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      required: "Descrição obrigatória",
      maxLength : {
        value: 65,
        message: "Máximo de 65 caracteres"
      }
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (image: ImageFormData) => {
      api.post('/api/images', image)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('images');
      }

    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    console.log('data', data)
    console.log('imageurl', imageUrl)
    try {
      if (!imageUrl) {
        toast({
          status: "error",
          title: "Imagem não adicionada",
          description: "É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.",
        })
        return
      }

      await mutation.mutateAsync({
        title: String(data.title),
        description: String(data.description),
        url: imageUrl,
      })
      toast({
        status: 'success',
        title: 'Imagem cadastrada com sucesso.',
      })
    } catch {
      toast({
        status: 'error',
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar sua imagem',
      });
    } finally {
      closeModal();
      reset();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          name="image"
          error={errors.image}
          {...register("image", formValidations.image)}
        />

        <TextInput
          placeholder="Título da imagem..."
          name="title"
          error={errors.title}
          {...register("title", formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          name="description"
          error={errors.description}
          {...register("description", formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
