interface inputProps {
  placeHolder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<inputProps> = ({
  placeHolder,
  value,
  type,
  disabled,
  onChange,
}) => {
  return (
    <input
      disabled={disabled}
      value={value}
      type={type}
      placeholder={placeHolder}
      onChange={onChange}
      className="w-full text-lg p-4 bg-black border-2 border-neutral-800 
      rounded-md outline-none text-white focus:border-sky-500 focus:border-2
      disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
    />
  );
};

export default Input;
