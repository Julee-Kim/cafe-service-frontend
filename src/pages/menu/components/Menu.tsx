import React from 'react'
import { Link } from 'react-router-dom'
import { categoriesAndMenus_getCategories_categories, categoriesAndMenus_getMenus_results } from '../../../__generated__/categoriesAndMenus'

interface IMenuProps {
  selectedCategory: string;
  categories?: categoriesAndMenus_getCategories_categories[] | null;
  menus?: categoriesAndMenus_getMenus_results[] | null;
}

export const Menu: React.FC<IMenuProps> = ({ selectedCategory, categories, menus }) => {
  return (
    <>      
      {selectedCategory === 'All'
        ? (
          // all category menus
          <div className="menus">
            {categories?.map(category => (
              <div className="menus_area" key={category.id}>
                <h3 className="menus_title">{category.name}</h3>
                <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {menus && menus.map(menu => (
                    (category.id === menu.category.id) && (
                      <li key={menu.id}>
                        <Link to={`/menus/${menu.id}`}>
                          <div className="img_wrap">
                            <img src={menu.img} alt={menu.productName} />
                          </div>
                          <p className="menu_name">{menu.productName}</p>
                        </Link>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          // selected category menus
          <div className="menus">
            {categories?.map(category => (
              (selectedCategory === category.name && (
                <div className="menus_area" key={category.id}>
                  <h3 className="menus_title">{category.name}</h3>
                  <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {menus && menus.map(menu => (
                      (category.id === menu.category.id) && (
                        <li key={menu.id}>
                          <Link to={`/menus/${menu.id}`}>
                            <div className="img_wrap">
                              <img src={menu.img} alt={menu.productName} />
                            </div>
                            <p className="menu_name">{menu.productName}</p>
                          </Link>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              ))
            ))}
          </div>
        )
      }      
    </>
  )
}
