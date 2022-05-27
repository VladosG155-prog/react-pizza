import React from 'react';
import { useSelector } from 'react-redux';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../context';

const Home = () => {
	const { categoryId, sort } = useSelector((state) => state.filter);
	const sortType = sort.sortProperty;
	const { searchValue } = React.useContext(SearchContext);
	const [pizzas, setPizzas] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1);

	React.useEffect(() => {
		setIsLoading(true);

		const order = sortType.includes('-') ? 'asc' : 'desc';
		const sortBy = sortType.replace('-', '');
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		fetch(
			`https://627d391fbf2deb7174e9d43c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		)
			.then((res) => res.json())
			.then((items) => {
				setPizzas(items);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	const pizzasItems = pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzasItems}</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</>
	);
};

export default Home;
