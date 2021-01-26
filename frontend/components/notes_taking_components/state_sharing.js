import { Subject } from 'rxjs';

const subject = new Subject();

export const switches = {
    sendExpand: size => subject.next(size),
    receiveExpand: () => subject.asObservable()
};
export const tagPadRegresh = {
    sendTag: tag => subject.next(tag),
    receiveTag: () => subject.asObservable()
};