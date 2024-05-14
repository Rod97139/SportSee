export const formatUserInfos = (data) => {
    const { id, userInfos, score, todayScore, keyData } = data;
    return {
        id,
        userInfos,
        todayScore: todayScore ?? score,
        keyData,
    };
}