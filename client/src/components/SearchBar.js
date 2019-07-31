import React from "react";

class SearchBar extends React.Component {

    handleChange = (e) => {
      this.props.onFuzzySearch(e.target.value);
    }
  
    render() {
      const searchValue = this.props.searchValue;
      
      return (
        <div>
          <form className="search-form">
              <div className="">
                <input
                  type="text"
                  
                  aria-label= "filter through descriptions"
                  placeholder= "Filter"
                  onChange= {this.handleChange}
                  value = {searchValue}
                />
              </div>
          </form>
        </div>
      )
    }
  }
  
  export default SearchBar;