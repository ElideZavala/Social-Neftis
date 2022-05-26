import React from 'react';

const SearchLoading = () => {
	return ( 
		<div className="searchLoading">
			<div className="searchLoading__loader">
				<div className="searchLoading__loader--dot"></div>
				<div className="searchLoading__loader--dot"></div>
				<div className="searchLoading__loader--dot"></div>
				<div className="searchLoading__loader--dot"></div>
				<div className="searchLoading__loader--dot"></div>
				<div className="searchLoading__loader--dot"></div>
				<div className="searchLoading__loader--text"></div>
			</div>
		</div>
	 );
}
 
export default SearchLoading;