export const paginate = (limit: number, page: number) => {
    const skip = page == 0 ? 0 : page * limit;
    const take = page == 0 ? limit : limit * page;
    return {take, skip}
}


