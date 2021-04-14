import { MenuDetail } from '../pages/menu/MenuDetail';
import { MenuList } from '../pages/menu/MenuList';
import { Cart } from '../pages/order/Cart';
import { StoreMap } from '../pages/store/StoreMap';

export const CommonRoutes = [
  {
    path: '/menus',
    component: <MenuList />
  },
  {
    path: '/menus/:id',
    component: <MenuDetail />
  },
  {
    path: '/stores',
    component: <StoreMap />
  },
  {
    path: '/cart',
    component: <Cart />
  },
];