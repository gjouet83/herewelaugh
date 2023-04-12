const Sort = ({ sortBy, setSortBy }) => {
  return (
    <form onChange={(e) => setSortBy(e.target.value)}>
      <select className="sort" name="sort">
        <option value="newer">Le plus récent</option>
        <option value="most_rated">Le mieux noté</option>
      </select>
    </form>
  );
};

export default Sort;
