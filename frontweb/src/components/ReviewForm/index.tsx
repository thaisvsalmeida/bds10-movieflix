import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BASE_URL, requestBackend } from 'util/requests';
import { Review } from 'types/review';
import ButtonIcon from 'components/ButtonIcon';

import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    console.log(formData);

    const saveReview: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      withCredentials: true,
      baseURL: BASE_URL,
      data: formData,
    };

    requestBackend(saveReview)
      .then((response) => {
        setValue('text', '');
        onInsertReview(response.data);
        toast.success('Comentário salvo com sucesso!');
      })
      .catch(() => {
        toast.error('Erro ao salvar!');
      });
  };

  return (
    <div>
      <div className="container-review">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('text', {
              required: 'Campo obrigatório',
            })}
            type="text"
            placeholder="Deixe sua avaliação aqui"
            name="text"
          />
          <div>{errors.text?.message}</div>
          <div className="button">
            <ButtonIcon text="SALVAR AVALIAÇÃO" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
