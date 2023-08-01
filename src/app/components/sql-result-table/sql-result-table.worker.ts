/// <reference lib="webworker" />

addEventListener('message', ({ data: { query, pageSize, pageNumber } }) => {
  // considering each mock file as an API to load
  // simulating backend pagination to avoid huge load of data
  // once the huge data is downloaded from import, then get chunks of data to display in table
  switch (query) {
    case 'select * from User where id=1234':
      postMessage(paginate([], pageSize, pageNumber));
      break;
    case 'select * from User where name="John"':
      import('./mock-data/sm-data.mock').then((x) =>
        postMessage(paginate(x.smData, pageSize, pageNumber))
      );
      break;
    case 'select * from User where age > 22':
      import('./mock-data/md-data.mock').then((x) =>
        postMessage(paginate(x.mdData, pageSize, pageNumber))
      );
      break;
    case 'select * from User where sex = "Male"':
      import('./mock-data/lg-data.mock').then((x) =>
        postMessage(paginate(x.lgData, pageSize, pageNumber))
      );
      break;
    case 'select * from User where isCitizen = 1':
      import('./mock-data/xl-data.mock').then((x) =>
        postMessage(paginate(x.xlData, pageSize, pageNumber))
      );
      break;
    default:
      postMessage({});
  }
});

/**
 * Manual pagination from huge data set
 *
 * @param pageSize
 * @param pageNumber
 * @returns Extracted array
 */
const paginate = (data: any[], pageSize: number, pageNumber: number) => ({
  data: data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
  totalCount: data.length,
});
