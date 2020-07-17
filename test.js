import Wizardate, { pt_BR, LittleEndian } from './src/wizardate';

const wizardate = new Wizardate(pt_BR);

wizardate.setDateFormat(LittleEndian);

console.log(wizardate.getDate());

console.log(process.env.INIT_CWD);
