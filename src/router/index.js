import bog from './bog';
import bt8 from './bt8';
import sdy from './sdy';
import jun from './jun';
import mgm from './mgm';
import ybo from './ybo'
import ab8 from './ab8'
import ob8 from './ob8'
import ysz from './ysz'
import hbx from './hbx'
import mbs from './mbs'
import bw1 from './bw1'
import ywb from './ywb'
import darkGreen from './darkGreen'
import blackGold from './blackGold'
const routerData = { bog, bt8, sdy ,jun, ybo, ab8, ob8, ysz, hbx, mbs, bw1, ywb, mgm, darkGreen, blackGold };
export default routerData[process.env.VUE_APP_APP_TEMPLATE];
