export interface Interval {
    key: string;
    intName: string;
    intTime: number;
    isOnEditing: boolean;
}

 export const intervalsExample: Interval[] = [
     {
         key: "abc",
         intName: "to get to work",
         intTime: 60,
         isOnEditing: false,
    },
     {
         key: "dab",
         intName: "to spend on traffic",
         intTime: 10,
         isOnEditing: false,
      } ] 
