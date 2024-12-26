import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  openDB,
} from "../database/db";

export default function AddButton({ action }) {
  return (
    <div
      className="bg-base-300 btn justify-center flex rounded-lg"
      onClick={action}
    >
      <h1 className="p-3 cursor-pointer">Add Task +</h1>
    </div>
  );
}

export function OptionsButton({ action, name }) {
  return (
    <>
      <button className="btn btn-ghost" onClick={action}>
        {name}
      </button>
    </>
  );
}

export function AddCategoryButton() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const initializeDB = async () => {
      try {
        await openDB();
        const categoryList = await fetchCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error("Failed to open DB or fetch categories:", error);
      }
    };

    initializeDB();
  }, []);

  const handleSubmit = async () => {
    if (!category.trim()) {
      enqueueSnackbar("Category name is required!");
      return;
    }

    setLoading(true);

    try {
      await addCategory({ name: category });
      setCategories((prevCategories) => [
        ...prevCategories,
        { name: category },
      ]);
      setCategory(""); 
    } catch (error) {
      console.error("Error while adding category:", error);
      enqueueSnackbar(
        "There was an error adding the category. Please try again.",
        { variant: "error" }
      );
    }

    setLoading(false);
  };

  const handleDeleteCategory = (id) => async () => {
    try {
      await deleteCategory(id);
      setCategories((prevCategories) => {
        const newCategories = prevCategories.filter((cat) => cat.id !== id);
        console.log("Deleting category with ID:", id);
        return newCategories;
      });
    } catch (error) {
      console.error("Error while deleting category:", error);
      enqueueSnackbar(
        "There was an error deleting the category. Please try again.",
        { variant: "error" }
      );
    }
  };
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-primary m-1">
        New Category
      </div>
      <div
        tabIndex={0}
        className="dropdown-content card card-compact bg-white text-primary-content z-[1] w-64 p-2 shadow-lg"
      >
        <div className="card-body">
          <h3 className="card-title">Categories</h3>
          <label className="form-control w-full max-w-xs mb-2">
            <span className="label-text pb-2">Category Name</span>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="category name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input input-bordered focus:outline-none rounded-r-none w-full max-w-xs"
              />
              <button
                onClick={handleSubmit}
                className="btn btn-primary w-16 rounded-l-none self-end"
                type="button"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </label>
          {categories.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold pb-1">Category List:</h4>
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <div
                    className="flex bg-primary w-auto h-10 px-5 rounded-badge gap-1 items-center mr-1"
                    key={cat.id}
                  >
                    <button
                      className="btn btn-ghost p-0 m-0 text-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(cat.id)();
                      }}
                      aria-label="Delete category"
                    >
                      <IoClose />
                    </button>
                    <span>{cat.name || cat.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
