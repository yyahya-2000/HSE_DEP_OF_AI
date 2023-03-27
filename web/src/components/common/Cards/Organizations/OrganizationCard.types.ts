import {DictionaryItemProps, LinkProps} from "../../../../types";


export type OrganizationCardProps = {
    nid: number,
    common_org_name: string,
    mail_address: string,
    org_app_domain: DictionaryItemProps[],
    org_competence_ai: DictionaryItemProps[],
    org_date: string,
    org_desc: string,
    org_email: string,
    org_fle_url: LinkProps[],
    org_form: string,
    org_head: string,
    org_head_cont: string,
    org_inn: bigint,
    org_location: string,
    org_method_ai: DictionaryItemProps[],
    org_ogrn: bigint,
    org_okved: string,
    org_okved_add: string,
    org_profit: number,
    org_publications: DictionaryItemProps[],
    org_reg_address: string,
    org_reports: DictionaryItemProps[],
    org_revenue: number,
    org_size: DictionaryItemProps[],
    org_spec_num: number,
    org_staff_num: number,
    org_startup: boolean,
    org_status: DictionaryItemProps[],
    org_subject: string,
    org_tax: number,
    org_tel: string,
    org_tools_ai: DictionaryItemProps[],
    org_vzir: number,
    org_website: LinkProps[],
    uid: DictionaryItemProps[],
    title: string,
    created: string




}