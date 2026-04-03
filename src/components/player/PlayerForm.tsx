'use client';


import { useState } from "react";

type PlayerFormData = {
  name: string;
  position: string;
  jersey_number: number;
  age: number;
  photo: File | null;
};

const PlayerForm = ({ onSubmit, initialData = {} }: any) => {
  const [form, setForm] = useState<PlayerFormData>({
    name: initialData.name || '',
    position: initialData.position || 'Forward',
    jersey_number: initialData.jersey_number || 0,
    age: initialData.age || 18,
    photo: null,
  });

  return (
    <form onSubmit={(e) => onSubmit(e, form)} className="space-y-4">
      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
        required
        className="w-full border p-2"
      />

      <select
        value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
        className="w-full border p-2"
      >
        {['Forward', 'Midfielder', 'Defender', 'Goalkeeper'].map((pos) => (
          <option key={pos} value={pos}>
            {pos}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={form.jersey_number}
        onChange={(e) =>
          setForm({ ...form, jersey_number: +e.target.value })
        }
        placeholder="Jersey"
        className="w-full border p-2"
      />

      <input
        type="number"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: +e.target.value })}
        placeholder="Age"
        className="w-full border p-2"
      />

      <input
        type="file"
        onChange={(e) =>
          setForm({ ...form, photo: e.target.files?.[0] || null })
        }
        className="w-full border p-2"
      />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
};

export default PlayerForm;
