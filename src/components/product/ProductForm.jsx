import { CATEGORY_MAP, formatLabel } from "./data";

export default function ProductForm({
  form,
  setForm,
  previewError,
  setPreviewError,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setForm({ ...form, category: value, subCategory: "" });
      return;
    }

    if (name === "image" && setPreviewError) {
      setPreviewError(false);
    }

    setForm({ ...form, [name]: value });
  };

  return (
    <div className="space-y-4">
      <Input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name *"
      />

      <Input
        name="brandName"
        value={form.brandName}
        onChange={handleChange}
        placeholder="Brand Name"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price *"
        />
        <Input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity *"
        />
      </div>

      <Input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
      />

      <Select name="category" value={form.category} onChange={handleChange}>
        <option value="">Select Category *</option>
        {Object.keys(CATEGORY_MAP).map((cat) => (
          <option key={cat} value={cat}>
            {formatLabel(cat)}
          </option>
        ))}
      </Select>

      {form.category && (
        <Select
          name="subCategory"
          value={form.subCategory}
          onChange={handleChange}
        >
          <option value="">Select Sub Category *</option>
          {CATEGORY_MAP[form.category].map((sub) => (
            <option key={sub} value={sub}>
              {formatLabel(sub)}
            </option>
          ))}
        </Select>
      )}

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Product description"
        className="field-control min-h-28 px-4 py-3"
      />
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="field-control px-4 py-3"
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className="field-control px-4 py-3"
    />
  );
}
