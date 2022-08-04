const LoadMoreBtn = ({onLoadMore, isLoading}) => {
    const showHideBtn = isLoading ? {display: 'none'} : {display: 'block'}
    return (
        <button 
            className="button button__main button__long"
            style={showHideBtn}
            onClick={onLoadMore}>
            <div className="inner">load more</div>
        </button>
    );
}

export default LoadMoreBtn