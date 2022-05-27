import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
const Categories = () => {
	const dispatch = useDispatch();
	const categoryId = useSelector((state) => state.filter.categoryId);
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
	return (
		<div className="categories">
			<ul>
				{categories.map((category, index) => (
					<li
						key={`${category}_${index}`}
						className={categoryId === index ? 'active' : ''}
						onClick={() => dispatch(setCategoryId(index))}>
						{category}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
