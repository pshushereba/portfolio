import Header from "../components/layout/Header.js";

const Index = ({ title, description, ...props }) => {
  return (
    <div>
      <Header />
      <p>Hello, world!</p>
    </div>
  );
};

export default Index;

// export async function getStaticProps() {
//   const configData = await import(`../siteconfig.json`);

//   return {
//     props: {
//       title: configData.default.title,
//       description: configData.default.description,
//     },
//   };
// }
