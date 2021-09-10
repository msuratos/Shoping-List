export const GetItemsForUser = async () => {
  return await fetch('api/v1/item?userid=user1');
};

export const AddCategory = async (category) => {
  const categoryDto = {
    category,
    userid: 'user1'
  };
  const urlParams = {
    method: 'POST',
    body: JSON.stringify(categoryDto),
    headers: {
        'Content-Type': 'application/json'
    }
  };

  return await fetch('/api/v1/category', urlParams);
};

export const AddItem = async (item) => {
  const categoryDto = {
    categoryid: '8c3b1b1c-1dc1-4864-9ad0-663f1dd5ce87',
    userid: 'user1',
    item
  };
  const urlParams = {
    method: 'POST',
    body: JSON.stringify(categoryDto),
    headers: {
        'Content-Type': 'application/json'
    }
  };

  return await fetch('/api/v1/item', urlParams);
};