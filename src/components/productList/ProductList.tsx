import type { ProductType } from '../../types';

import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import Product from './Product';
import SkeletonProduct from './SkeletonProduct';

import * as api from '../../api';
import { cartState } from '../../recoil/state';
import { API_ERROR_MESSAGE, SKELETONS_LENGTH } from '../../constants';

export default function ProductList() {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const setCart = useSetRecoilState(cartState);

  useEffect(() => {
    try {
      api.getProducts().then(setProducts);
    } catch {
      alert(API_ERROR_MESSAGE.getProducts);
    }

    try {
      api.getCart().then(setCart);
    } catch {
      alert(API_ERROR_MESSAGE.getCart);
    }
  }, []);

  return (
    <Wrapper>
      {products === null
        ? Array.from({ length: SKELETONS_LENGTH }).map(() => <SkeletonProduct />)
        : products.map((product) => <Product key={product.id} {...product} />)}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 282px);
  grid-column-gap: 48px;
  grid-row-gap: 64px;

  @media (max-width: 1272px) {
    grid-template-columns: repeat(3, 282px);
  }

  @media (max-width: 942px) {
    grid-template-columns: repeat(2, 282px);
  }

  @media (max-width: 612px) {
    grid-template-columns: repeat(1, 282px);
  }
`;
