interface TeaFormValues {
  id?: string;
  name?: string;
  emoji?: string;
  category?: string;
  caffeine?: string;
  flavors?: string[];
  goals?: string[];
  times?: string[];
  steep_temp?: string;
  steep_time?: string;
  description?: string;
  ritual?: string;
}

interface TeaFormProps {
  action: (formData: FormData) => void | Promise<void>;
  initialValues?: TeaFormValues;
  isEditing?: boolean;
  submitLabel: string;
}

const CAFFEINE_OPTIONS = ["none", "low", "medium", "high"] as const;
const FLAVOR_OPTIONS = ["earthy", "floral", "fruity", "spiced", "fresh"] as const;
const GOAL_OPTIONS = ["relax", "energy", "digestion", "sleep", "wellness"] as const;
const TIME_OPTIONS = ["morning", "afternoon", "evening"] as const;

const inputClass = "mt-2 w-full rounded-lg border border-outline bg-surface px-4 py-2.5 text-text";
const labelClass = "block text-sm font-semibold text-text";
const checkboxLabelClass = "flex items-center gap-2 text-sm text-text";

export default function TeaForm({
  action,
  initialValues = {},
  isEditing = false,
  submitLabel,
}: TeaFormProps) {
  return (
    <form action={action} className="mt-8 space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="id" className={labelClass}>
            ID (slug)
          </label>
          <input
            id="id"
            name="id"
            type="text"
            required
            readOnly={isEditing}
            defaultValue={initialValues.id}
            className={`${inputClass} ${isEditing ? "bg-surface-muted text-text-muted" : ""}`}
          />
        </div>
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={initialValues.name}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="emoji" className={labelClass}>
            Emoji
          </label>
          <input
            id="emoji"
            name="emoji"
            type="text"
            required
            defaultValue={initialValues.emoji}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            required
            defaultValue={initialValues.category}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="steep_temp" className={labelClass}>
            Steep temperature
          </label>
          <input
            id="steep_temp"
            name="steep_temp"
            type="text"
            required
            defaultValue={initialValues.steep_temp}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="steep_time" className={labelClass}>
            Steep time
          </label>
          <input
            id="steep_time"
            name="steep_time"
            type="text"
            required
            defaultValue={initialValues.steep_time}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <p className={labelClass}>Caffeine level</p>
        <div className="mt-2 flex flex-wrap gap-4">
          {CAFFEINE_OPTIONS.map((level) => (
            <label key={level} className={checkboxLabelClass}>
              <input
                type="radio"
                name="caffeine"
                value={level}
                defaultChecked={
                  initialValues.caffeine === level || (!initialValues.caffeine && level === "none")
                }
                required
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className={labelClass}>Flavors</p>
        <div className="mt-2 flex flex-wrap gap-4">
          {FLAVOR_OPTIONS.map((flavor) => (
            <label key={flavor} className={checkboxLabelClass}>
              <input
                type="checkbox"
                name="flavors"
                value={flavor}
                defaultChecked={initialValues.flavors?.includes(flavor)}
              />
              {flavor}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className={labelClass}>Goals</p>
        <div className="mt-2 flex flex-wrap gap-4">
          {GOAL_OPTIONS.map((goal) => (
            <label key={goal} className={checkboxLabelClass}>
              <input
                type="checkbox"
                name="goals"
                value={goal}
                defaultChecked={initialValues.goals?.includes(goal)}
              />
              {goal}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className={labelClass}>Times of day</p>
        <div className="mt-2 flex flex-wrap gap-4">
          {TIME_OPTIONS.map((time) => (
            <label key={time} className={checkboxLabelClass}>
              <input
                type="checkbox"
                name="times"
                value={time}
                defaultChecked={initialValues.times?.includes(time)}
              />
              {time}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={initialValues.description}
          className={`${inputClass} resize-y`}
        />
      </div>

      <div>
        <label htmlFor="ritual" className={labelClass}>
          Ritual
        </label>
        <textarea
          id="ritual"
          name="ritual"
          required
          rows={3}
          defaultValue={initialValues.ritual}
          className={`${inputClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover"
      >
        {submitLabel}
      </button>
    </form>
  );
}
