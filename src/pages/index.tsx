import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  id: string;
  title: string;
  url: string;
  description: string;
  ts: number;
};

type ImagePayload = {
  data: Image[];
  after: string | null;
};

const fetchImages = async ({ pageParam = null }): Promise<ImagePayload> => {
  const response = await api.get('/api/images', {
    params: {
      after: pageParam,
    },
  });

  return response.data;
};

const getNextPageParam = (data: ImagePayload): string | null => {
  if (data.after) {
    return data.after;
  }

  return null;
};

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => getNextPageParam(lastPage),
  });

  const formattedData = useMemo(() => {
    if (data) {
      return data.pages.map(page => page.data).flat();
    }

    return [];
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button marginTop="40px" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
