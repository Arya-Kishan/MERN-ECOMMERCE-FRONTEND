import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, StarIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBrandsAsync, fetchAllCategoriessAsync, fetchAllProductsAsync, fetchFilteredProductsAsync, selectAllBrands, selectAllCategories, selectAllProducts, selectProductsCount } from '../../../features/Product/ProductSlice'
import { Link, useNavigate } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminProductList() {

  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);
  const count = useSelector(selectProductsCount);
  const brands = useSelector(selectAllBrands);
  const [page, setPage] = useState(1)
  const navigate = useNavigate();

  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: categories,
    },
    {
      id: 'brand',
      name: 'brand',
      options: brands,
    },
  ]

  const handleFilter = (e, section, option) => {
    let filters1 = { [section.id]: option.value };
    dispatch(fetchFilteredProductsAsync(filters1));
  }

  const handlePagination = (e) => {
    let page = +e.target.innerText;
    dispatch(fetchAllProductsAsync({ page }));
    setPage(+e.target.innerText)
  }
  const handlePrevious = (e) => {
    if (page > 1) {
      dispatch(fetchAllProductsAsync({ page: page - 1 }));
      setPage((page) => page - 1)
    } else {
      setPage(1)
    }

  }

  const handleNext = (e) => {
    if (page < 12) {
      dispatch(fetchAllProductsAsync({ page: page + 1 }));
      setPage((page) => page + 1)
    } else {
      setPage(12)
    }
  }

  const handleDetail = (e, id) => {
    navigate(`/detail/${id}`)
  }



  useEffect(() => {
    dispatch(fetchAllProductsAsync({ page }));
    dispatch(fetchAllCategoriessAsync());
    dispatch(fetchAllBrandsAsync());
  }, [])

  return (
    <div>
      {products && (
        <>
          <div className="bg-white">
            <div>
              {/* Mobile filter dialog */}
              <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                      as={Fragment}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                        <div className="flex items-center justify-between px-4">
                          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                          <button
                            type="button"
                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                            onClick={() => setMobileFiltersOpen(false)}
                          >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4 border-t border-gray-200">
                          <h3 className="sr-only">Categories</h3>

                          {filters.map((section) => (
                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                              {({ open }) => (
                                <>
                                  <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                      <span className="font-medium text-gray-900">{section.name}</span>
                                      <span className="ml-6 flex items-center">
                                        {open ? (
                                          <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                          <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                        )}
                                      </span>
                                    </Disclosure.Button>
                                  </h3>
                                  <Disclosure.Panel className="pt-6">
                                    <div className="space-y-6">
                                      {section?.options?.map((option, optionIdx) => (
                                        <div key={option.value} className="flex items-center">
                                          <input
                                            onChange={e => handleFilter(e, section, option)}
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            defaultChecked={option.checked}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          ))}
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition.Root>

              {/* DESKTOP filter dialog */}
              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">Admin Product</h1>

                  <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                          Sort
                          <ChevronDownIcon
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                      </Transition>
                    </Menu>

                    <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                      <span className="sr-only">View grid</span>
                      <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                      onClick={() => setMobileFiltersOpen(true)}
                    >
                      <span className="sr-only">Filters</span>
                      <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                  <h2 id="products-heading" className="sr-only">
                    Products
                  </h2>

                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    <form className="hidden lg:block">
                      <h3 className="sr-only">Categories</h3>

                      {filters.map((section) => (
                        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                          {({ open }) => (
                            <>
                              <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">{section.name}</span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                  {section?.options?.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                      <input
                                        onChange={e => handleFilter(e, section, option)}
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                      <Link to={`/admin/productForm/addNew`} className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add New Product</Link>
                      <Link to={`/admin/category`} className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add New Category</Link>
                      <Link to={`/admin/category`} className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add New Brand</Link>
                    </form>

                    {/* Product grid */}
                    <div className="lg:col-span-3">{
                      <CardContainer products={products} handleDetail={handleDetail} ></CardContainer>
                    }</div>
                  </div>
                </section>
              </main>
            </div>
          </div>
          {/* PAGINATION */}
          <Pagination handlePagination={handlePagination} count={count} handlePrevious={handlePrevious} handleNext={handleNext} ></Pagination>
        </>
      )}
    </div>
  )
}


function CardContainer({ products, handleDetail }) {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-2 py-0 sm:px-2 sm:py-0 lg:max-w-7xl lg:px-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products?.map((product,i) => (
              <div className='flex flex-col' key={i}>
                <div onClick={e => handleDetail(e, product._id)} key={product._id} className="group relative">

                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>

                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <p>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.title}
                        </p>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.brand}
                      </p>
                    </div>

                    <div>
                      <p className="mt-1 text-sm text-gray-500">$ {product.price}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 flex"><StarIcon className='w-4 h-4' /> {product.rating}
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/admin/productForm/${product._id}`}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  )
}

function Pagination({ handlePagination, count, handleNext, handlePrevious }) {

  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">

          <div>
            <p className="text-sm text-gray-700">
              Total : {count}
            </p>
          </div>

          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a
                href="#"
                onClick={handlePrevious}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {
                'abcdefghqwdf'.split("").map((e, i) => (
                  <span
                    onClick={e => handlePagination(e)}
                    href="#"
                    key={i}
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {i + 1}
                  </span>
                ))
              }
              <a
                onClick={handleNext}
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>

        </div>
      </div>
    </>
  )
}