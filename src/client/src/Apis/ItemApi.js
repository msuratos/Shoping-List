import { mgr } from "../redux/slices/authslice";

export const GetItemsForUser = async () => {
  const user = await mgr.getUser();
  return await fetch('api/v1/item', {
    headers: {
      'Authorization': `Bearer ${user.access_token}`
    }
  });
};

export const AddCategory = async (category) => {
  const categoryDto = { category };
  const urlParams = {
    method: 'POST',
    body: JSON.stringify(categoryDto),
    headers: {
        'Content-Type': 'application/json'
    }
  };

  return await fetch('/api/v1/category', urlParams);
};

export const AddItem = async (item, categoryid) => {
  const categoryDto = { categoryid: categoryid, item };
  const urlParams = {
    method: 'POST',
    body: JSON.stringify(categoryDto),
    headers: {
        'Content-Type': 'application/json'
    }
  };

  return await fetch('/api/v1/item', urlParams);
};