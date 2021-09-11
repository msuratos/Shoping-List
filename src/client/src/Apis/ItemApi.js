export const GetItemsForUser = async () => {
  return await fetch('api/v1/item');
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

export const AddItem = async (item, categoryid) => {
  const categoryDto = {
    categoryid: categoryid,
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