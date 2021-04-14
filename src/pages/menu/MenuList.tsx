import { useQuery } from '@apollo/client';
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { categoriesAndMenus } from '../../__generated__/categoriesAndMenus';
import { Menu } from './components/Menu';

const CATEGORIES_AND_MENUS = gql`
  query categoriesAndMenus {
    getCategories {
      success
      error
      categories {
        id
        name
      }
    }
    getMenus {
      success
      error
      results {
        id
        productName
        img
        category {
          id
        }
      }
    }
  }
`;

export const MenuList = () => {
  const { data, loading } = useQuery<categoriesAndMenus>(CATEGORIES_AND_MENUS);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
  }

  return (
    <div className="container">
      <h2>메뉴</h2>
      {!loading && (
        <>
          <div className="category_wrap">
            <ul>
              <li
                className={`${selectedCategory === 'All' && 'active'}`}
                onClick={() => selectCategory('All')}
              >All</li>
              {data?.getCategories.categories?.map(category => (
                <li
                  key={category.id}
                  className={`${selectedCategory === category.name && 'active'}`}
                  onClick={() => selectCategory(category.name)}
                >{category.name}</li>
              ))}
            </ul>
          </div>

          <Menu
            selectedCategory={selectedCategory}
            categories={data?.getCategories.categories}
            menus={data?.getMenus.results}
          />
        </>
      )}
    </div>
  )
}
