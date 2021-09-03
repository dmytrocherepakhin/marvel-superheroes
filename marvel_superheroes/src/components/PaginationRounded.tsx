import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
    createStyles({
        ul: {
            border: '1px solid white',
            color: 'white',
        },
        root: {
            backgroundColor: 'white',
            border: '1px solid white',
            borderRadius: '10px',
            margin: '15px 0',
            padding: '0 15px 15px',
            display: 'flex',
            justifyContent: 'center',
            '& > *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);

export default function PaginationRounded(props: any): JSX.Element {
    const classes = useStyles();
    const checkedPage = (event: React.ChangeEvent<unknown>, page: number) => {
        props.setCurrentPage(page)
    }

    return (
        <div className={classes.root}>
            <Pagination
                onChange={checkedPage}
                count={props.count}
                page={props.page}
                variant="outlined" color="secondary" shape="rounded"
            />
        </div>
    );
}


