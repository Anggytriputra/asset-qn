import { createDataAsset } from "../service/dataAsset/resDataAsset";

async function handleSubmit(data, id) {
  const response = await createDataAsset(data, id);
}

export { handleSubmit };
