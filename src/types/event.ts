export interface Event {
  _id: string;
  seller_mb_id: string;
  event_location: string;
  event_title: string;
  event_description: string;
  event_status: string;
  event_image: string;
  event_date: Date;
  createdAt: Date;
  updatedAt: Date;
}
