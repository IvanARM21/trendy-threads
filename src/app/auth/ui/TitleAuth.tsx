interface Props {
  children: React.ReactNode;
}

export const TitleAuth = ({ children }: Props) => {
  return <h1 className="text-4xl text-zinc-800 font-black">{children}</h1>;
};
