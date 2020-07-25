import Layout from "../components/layout/index.js";

const Index = ({ title, description, ...props }) => {
  return (
    <div>
      <Layout>
        <p>Hello, world!</p>
      </Layout>
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
